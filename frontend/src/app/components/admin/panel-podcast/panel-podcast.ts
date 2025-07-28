import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PodcastService, PodcastPayload, EpisodePayload } from '../../../services/podcast-service';
import { CommonModule } from '@angular/common';
import { CategoriaService, CategoriaPayload } from '../../../services/categorias-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // necesario para <mat-option>
import {PanelPodcastPc} from '../../admin/panel-podcast/panel-podcast-pc/panel-podcast-pc'

@Component({
  selector: 'app-panel-podcast',
  standalone: true,
  imports: [PanelPodcastPc,CommonModule, ReactiveFormsModule,MatFormFieldModule,MatSelectModule,MatOptionModule],
  templateUrl: './panel-podcast.html',
  styleUrl: './panel-podcast.css'
})
export class PanelPodcast implements OnInit {
  selectedTab: string = 'agregar-podcast';
  podcasts: PodcastPayload[] = [];
  selectedPodcast: PodcastPayload | null = null;
  editingPodcast: boolean = false;
  showingEpisodeForm: boolean = false;
  editingEpisode: boolean = false;
  selectedEpisode: EpisodePayload | null = null;
  categorias: CategoriaPayload[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  podcastForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    authorName: new FormControl(''),
    language: new FormControl('es'),
    coverImage: new FormControl(''),
    categories: new FormControl<string[]>([], Validators.required),
    tags: new FormControl(''),
    metaDescription: new FormControl(''),
    metaImage: new FormControl('')
  });

  episodeForm = new FormGroup({
    title: new FormControl<string | null>('', Validators.required),
    description: new FormControl<string | null>(''),
    audioUrl: new FormControl<string | null>('', Validators.required),
    image: new FormControl<string | null>(''),
    duration: new FormControl<number | null>(null),
    releaseDate: new FormControl<string | null>('')
  });

  constructor(private podcastService: PodcastService, private categoriasService: CategoriaService) {}

  ngOnInit() {
    this.loadPodcasts();
    this.loadCategories();
  }


  loadPodcasts() {
    this.podcastService.obtenerPodcasts().subscribe(podcasts => {
      this.podcasts = podcasts.map(podcast => ({
        ...podcast,
        episodes: podcast.episodes || []
      }));
    });
  }
  loadCategories(){
        this.categoriasService.obtenerCategorias().subscribe(categories => {
        this.categorias = categories;
      
        console.log("categorias",categories);
          });
    }
    getCategoryNameById(id: string): string {
      const cat = this.categorias.find(c => c._id === id);
      return cat ? cat.name : id;
    }
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.resetForms();
  }
  onCategoryChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  const selectedValues = Array.from(select.selectedOptions).map(option => option.value);
  this.podcastForm.get('categories')?.setValue(selectedValues);
}
onCategoryChangeNative(selectedIds: string[]) {
  this.podcastForm.get('categories')?.setValue(selectedIds);
}


onSubmitPodcast() {
  if (this.podcastForm.valid) {
    console.log(this.podcastForm.valid);
    const podcastData: PodcastPayload = {
      title: this.podcastForm.value.title!,
      description: this.podcastForm.value.description || '',
      authorName: this.podcastForm.value.authorName || '',
      language: this.podcastForm.value.language || 'es',
      coverImage: this.podcastForm.value.coverImage || '',
      categories: this.podcastForm.value.categories as string[],
      tags: this.podcastForm.value.tags
        ? this.podcastForm.value.tags.split(',').map(tag => tag.trim())
        : [],
      meta: {
        description: this.podcastForm.value.metaDescription || '',
        image: this.podcastForm.value.metaImage || ''
      }
    };
    
    if (this.editingPodcast && this.selectedPodcast?._id) {
      this.podcastService.actualizarPodcast(this.selectedPodcast._id, podcastData).subscribe(() => {
        this.loadPodcasts();
        this.resetForms();
      });
    } else {
         this.podcastService.crearPodcast(podcastData).subscribe({
      next: (res) => {
        this.successMessage = '🎉 Podcast guardado correctamente';
        this.loadPodcasts();
        this.resetForms();
      },
      error: (err) => {
        this.errorMessage = '❌ Error al guardar el podcast';
        console.error(err);
      }
    });
    }
  }
}


  onSubmitEpisodio() {
    if (this.episodeForm.valid && this.selectedPodcast) {
      const episodeData = this.episodeForm.value as EpisodePayload;
      if (this.editingEpisode && this.selectedEpisode) {
        this.podcastService.editarEpisodio(this.selectedPodcast._id!, this.selectedEpisode._id!, episodeData).subscribe(() => {
          this.loadPodcasts();
          this.resetEpisodeForm();
        });
      } else {
        this.podcastService.agregarEpisodio(this.selectedPodcast._id!, episodeData).subscribe(() => {
          this.loadPodcasts();
          this.resetEpisodeForm();
        });
      }
    }
  }
    editarPodcast(podcast: PodcastPayload) {
    this.podcastForm.patchValue({
      ...podcast,
      categories: podcast.categories, // array de _id directamente
      tags: podcast.tags ? podcast.tags.join(', ') : '',
      metaDescription: podcast.meta?.description || '',
      metaImage: podcast.meta?.image || ''
    });
    this.editingPodcast = true;
    this.selectedPodcast = podcast;
    this.selectedTab = 'agregar-podcast';
  }

  eliminarPodcast(podcastId: string) {
    this.podcastService.eliminarPodcast(podcastId).subscribe(() => {
      this.loadPodcasts();
      this.selectedPodcast = null;
    });
  }

  gestionarEpisodios(podcast: PodcastPayload) {
    this.selectedPodcast = podcast;
    this.resetEpisodeForm();
  }

  mostrarFormularioEpisodio() {
    this.showingEpisodeForm = true;
    this.editingEpisode = false;
    this.selectedEpisode = null;
    this.episodeForm.reset();
  }

  editarEpisodio(episode: EpisodePayload) {
    this.episodeForm.patchValue({
      ...episode,
      duration: episode.duration ?? null
    });
    this.showingEpisodeForm = true;
    this.editingEpisode = true;
    this.selectedEpisode = episode;
  }

  editarEpisodioDesdeAdmin(podcast: PodcastPayload, episode: EpisodePayload) {
    this.selectTab('agregar-episodio');
    this.selectedPodcast = podcast;
    this.editarEpisodio(episode);
  }

    eliminarEpisodio(podcastId: string, episodeId: string) {
      this.podcastService.eliminarEpisodio(podcastId, episodeId).subscribe(() => {
        this.loadPodcasts();
        if (this.selectedPodcast && this.selectedPodcast._id === podcastId) {
          const episodes = this.selectedPodcast.episodes || [];
          this.selectedPodcast.episodes = episodes.filter(ep => ep._id !== episodeId);
        }
      });
    }
    getPodcastById(podcastId: string): PodcastPayload | undefined {
      return this.podcasts.find(p => p._id === podcastId);
    }
  cancelarEpisodio() {
    this.resetEpisodeForm();
  }

  onPodcastSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedPodcast = this.podcasts.find(p => p._id === selectedId) || null;
  }

  getAllEpisodes(): { podcastId: string; podcastTitle: string; episode: EpisodePayload }[] {
    return this.podcasts.flatMap(podcast =>
      (podcast.episodes || []).map(episode => ({
        podcastId: podcast._id!,
        podcastTitle: podcast.title,
        episode
      }))
    );
  }

  private resetForms() {
    this.podcastForm.reset({ language: 'es' });
    this.editingPodcast = false;
    this.selectedPodcast = null;
    this.resetEpisodeForm();
  }

  private resetEpisodeForm() {
    this.episodeForm.reset();
    this.showingEpisodeForm = false;
    this.editingEpisode = false;
    this.selectedEpisode = null;
  }
}