import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  todos: any;

  dataManger = inject(DataManagerService);

  ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.dataManger.getTasks();

    console.log(this.dataManger.tasks);
  }
}
