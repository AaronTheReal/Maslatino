import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import  {NoticiasService} from '../../../services/noticias-service'
@Component({
  selector: 'app-panel-noticias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel-noticias.html',
  styleUrls: ['./panel-noticias.css']
})
export class PanelNoticias implements OnInit {
  noticiaForm: FormGroup;

  categoriasDisponibles: string[] = ['Deportes', 'Tecnología', 'Política', 'Cultura'];

  constructor(
  private fb: FormBuilder,
  private noticiasService: NoticiasService
  )
   {
    this.noticiaForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      summary: ['', Validators.maxLength(500)],
      categories: [''],
      location: this.fb.group({
        country: [''],
        region: [''],
        city: ['']
      }),
      state: ['draft'],
      publishAt: [null],
      content: this.fb.array([])  // FormArray de FormGroup para bloques
    });
  }

  ngOnInit(): void {
    console.log('PanelNoticias inicializado');
  }

  /** 
   * Tipamos como FormArray<FormGroup> para que Angular entienda 
   * que content.controls es FormGroup[]
   */
  get content(): FormArray<FormGroup> {
    return this.noticiaForm.get('content') as FormArray<FormGroup>;
  }

  /**
   * Helper: obtener FormArray de items de un bloque de lista
   * Si el bloque no tiene items o es inesperado, retorna array vacío
   */
  getListItems(blockIndex: number): FormArray {
    const blockGroup = this.content.at(blockIndex) as FormGroup;
    const itemsControl = blockGroup.get('items');
    if (itemsControl instanceof FormArray) {
      return itemsControl;
    }
    // En caso inesperado, devolver FormArray vacío
    return this.fb.array([]);
  }

  /** Crear FormGroup según tipo de bloque */
  private createBlockGroup(type: string): FormGroup {
    switch (type) {
      case 'text':
        return this.fb.group({
          type: ['text'],
          text: ['', Validators.required],
          tag: ['p'],
          style: this.fb.group({
            fontSize: [''],
            fontWeight: [''],
            fontFamily: ['']
          })
        });
      case 'image':
        return this.fb.group({
          type: ['image'],
          url: ['', Validators.required],
          alt: [''],
          caption: ['']
        });
      case 'list':
        return this.fb.group({
          type: ['list'],
          ordered: [false],
          items: this.fb.array([
            this.fb.control('', Validators.required)
          ])
        });
      case 'quote':
        return this.fb.group({
          type: ['quote'],
          quote: ['', Validators.required],
          authorQuote: ['']
        });
      case 'link':
        return this.fb.group({
          type: ['link'],
          href: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
          textLink: ['', Validators.required]
        });
      default:
        // Bloque genérico en caso de tipo no reconocido
        return this.fb.group({
          type: [type],
          data: ['']
        });
    }
  }

  /** Añadir un bloque nuevo */
  addBlock(type: string) {
    console.log('▶ addBlock llamado con type=', type);
    const blockGroup = this.createBlockGroup(type);
    this.content.push(blockGroup);
    console.log('   → Nuevo content.length =', this.content.length, 'content.value =', this.content.value);
  }

  /** Añadir ítem en bloque lista */
  addListItem(blockIndex: number) {
    const items = this.getListItems(blockIndex);
    items.push(this.fb.control('', Validators.required));
  }
  /** Quitar ítem en bloque lista */
  removeListItem(blockIndex: number, itemIndex: number) {
    const items = this.getListItems(blockIndex);
    if (items.length > 1) {
      items.removeAt(itemIndex);
    }
  }

  /** Envío del formulario */
  onSubmit() {
    // Marcar touched para mostrar errores, incluidas listas
    this.content.controls.forEach((blockGroup, i) => {
      const type = blockGroup.get('type')?.value;
      if (type === 'list') {
        const itemsFA = this.getListItems(i);
        itemsFA.controls.forEach(ctrl => ctrl.markAsTouched());
        itemsFA.markAsTouched();
      } else {
        // Marcar otros controles del bloque
        Object.values((blockGroup as FormGroup).controls).forEach(ctrl => ctrl.markAsTouched());
      }
    });
    if (this.noticiaForm.invalid) {
      this.noticiaForm.markAllAsTouched();
      console.warn('Formulario inválido');
      return;
    }
    const data = this.prepareSubmitData();
    console.log('Enviar al backend:', data);

      this.noticiasService.createNoticia(data).subscribe({
        next: (res) => {
          console.log('Noticia creada:', res);
          // Reset o feedback:
          this.noticiaForm.reset();
          while (this.content.length) {
            this.content.removeAt(0);
          }
          // Si se usan state/publishAt por defecto:
          this.noticiaForm.patchValue({ state: 'draft', publishAt: null });
          // Mostrar alerta o mensaje de éxito
        },
        error: (err) => {
          console.error('Error al crear noticia:', err);
          // Mostrar mensaje de error al usuario
        }
      });


  }

  /** Preparar datos para enviar al backend */
  private prepareSubmitData() {
    const raw = this.noticiaForm.value;
    const categoriasArray = raw.categories
      ? raw.categories.split(',').map((c: string) => c.trim()).filter((c: string) => c)
      : [];
    const autorId = 'a94f23c8bd7e4ad1f6c30ae5'; // Reemplaza obteniendo desde AuthService
    return {
      title: raw.title,
      summary: raw.summary,
      categories: categoriasArray,
      location: raw.location,
      state: raw.state,
      publishAt: raw.publishAt,
      author: autorId,
      content: raw.content
    };
  }
}
