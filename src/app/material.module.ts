import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  exports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatInputModule]
})
export class MaterialModule { }
