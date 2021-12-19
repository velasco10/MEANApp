import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from './autor.model';
import { AutorsService } from './autors.service';

@Component({
  selector: 'app-autors',
  templateUrl: './autors.component.html',
  styleUrls: ['./autors.component.css']
})
export class AutorsComponent implements OnInit, OnDestroy {

  desployColumns = ['name', 'surname', 'academyGrade'];
  dataSource = new MatTableDataSource<Autor>()

  private autorSubscription!: Subscription;

  constructor(private autorsService: AutorsService) { }

  ngOnInit(): void {
    this.autorsService.getAutors();
    this.autorSubscription= this.autorsService.getListener()
    .subscribe((autores:Autor[])=>{
      this.dataSource.data = autores
    })
    }

  ngOnDestroy(){
    this.autorSubscription.unsubscribe()
  }
}
