// src/app/admin/panel-noticias/panel-noticias.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../../services/noticias-service';
import { VistaPrevia } from '../../admin/panel-noticias/vista-previa/vista-previa';

// Para convertir Markdown a HTML y sanitizarlo
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-panel-noticias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, VistaPrevia],
  templateUrl: './panel-noticias.html',
  styleUrls: ['./panel-noticias.css']
})
export class PanelNoticias implements OnInit {
  noticiaForm: FormGroup;

  categoriasDisponibles: string[] = ['Deportes', 'Tecnología', 'Política', 'Cultura'];
  previewDataObj: any;
  blockOpenState: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private noticiasService: NoticiasService,
    private sanitizer: DomSanitizer
  ) {
    this.noticiaForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      summary: ['', Validators.maxLength(500)],
      categories: [''],
      location: this.fb.group({ country: [''], region: [''], city: [''] }),
      state: ['draft'],
      publishAt: [null],
      content: this.fb.array([])
    });
  }

  ngOnInit(): void {
      this.previewDataObj = this.buildPreviewData();
// Cada vez que cambie el form, reconstruimos
  this.noticiaForm.valueChanges.subscribe(() => {
    this.previewDataObj = this.buildPreviewData();
  });
    console.log('PanelNoticias inicializado');
  }


private buildPreviewData() {
  const raw = this.noticiaForm.value;
  return {
    ...raw,
    content: raw.content.map((block: any) => {
      if (block.type === 'text') {
        const mdHtml = marked.parse(block.text || '');
        return { ...block, html: mdHtml, style: block.style };
      }
      if (block.type === 'list') {
      const itemsHtml = block.items.map((item: string) => marked.parse(item));
      return {
        ...block,        // incluye block.items
        itemsHtml        // tu nuevo campo
      };
      }

      return block;
    })
  };
}


  get content(): FormArray {
    return this.noticiaForm.get('content') as FormArray;
  }

  getListItems(blockIndex: number): FormArray {
    const blockGroup = this.content.at(blockIndex) as FormGroup;
    const itemsControl = blockGroup.get('items');
    return itemsControl instanceof FormArray ? itemsControl : this.fb.array([]);
  }
  getBlock(i: number): FormGroup {
    return this.content.at(i) as FormGroup;
  }
  private createBlockGroup(type: string): FormGroup {
    switch (type) {
      case 'text':
        return this.fb.group({
          type: ['text'],
          text: ['', Validators.required],
          tag: ['p'],
          style: this.fb.group({ fontSize: [''], fontWeight: [''], fontFamily: [''] })
        });
      case 'image':
        return this.fb.group({ type: ['image'], url: ['', Validators.required], alt: [''], caption: [''] });
      case 'list':
        return this.fb.group({ type: ['list'], ordered: [false], items: this.fb.array([this.fb.control('', Validators.required)]) });
      case 'quote':
        return this.fb.group({ type: ['quote'], quote: ['', Validators.required], authorQuote: [''] });
      case 'link':
        return this.fb.group({ type: ['link'], href: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]], textLink: ['', Validators.required] });
      default:
        return this.fb.group({ type: [type], data: [''] });
    }
  }

  addBlock(type: string) {
    const blockGroup = this.createBlockGroup(type);
    this.content.push(blockGroup);
    // Inicialmente cerrado
    this.blockOpenState.push(true);
  }
  removeBlock(i: number) {
    this.content.removeAt(i);
    this.blockOpenState.splice(i, 1);
  }

  toggleBlock(i: number) {
    this.blockOpenState[i] = !this.blockOpenState[i];
  }
  addListItem(blockIndex: number) {
    this.getListItems(blockIndex).push(this.fb.control('', Validators.required));
  }

  removeListItem(blockIndex: number, itemIndex: number) {
    const items = this.getListItems(blockIndex);
    if (items.length > 1) items.removeAt(itemIndex);
  }

  onSubmit() {
    this.markAllTouched();
    if (this.noticiaForm.invalid) return;

    const data = this.prepareSubmitData();
    this.noticiasService.createNoticia(data).subscribe({
      next: res => {
        console.log('Noticia creada:', res);
        this.resetForm();
      },
      error: err => console.error('Error:', err)
    });
  }

  private markAllTouched() {
    this.noticiaForm.markAllAsTouched();
    this.content.controls.forEach((group, i) => {
      if (group.get('type')?.value === 'list') {
        this.getListItems(i).markAllAsTouched();
      } else {
        Object.values((group as FormGroup).controls).forEach(ctrl => ctrl.markAsTouched());
      }
    });
  }

  private resetForm() {
    this.noticiaForm.reset({ state: 'draft', publishAt: null });
    while (this.content.length) this.content.removeAt(0);
  }

  private prepareSubmitData() {
    const raw = this.noticiaForm.value;
    const categories = raw.categories
      ? raw.categories.split(',').map((c: string) => c.trim()).filter((c: string) => c)
      : [];
    const authorId = 'a94f23c8bd7e4ad1f6c30ae5';

    return { ...raw, categories, author: authorId };
  }

get previewData() {
  return this.buildPreviewData();
}

}
