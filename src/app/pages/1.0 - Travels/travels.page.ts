import { Component, OnInit } from '@angular/core';
import {IonicModule, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {UpdateModalComponent} from "../../components/update-modal/update-modal.component";

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
  imports: [IonicModule, CommonModule, SharedModule],
  standalone: true,
})
export class TravelsPage implements OnInit {
  travels: any[] = [];
  filteredTravels: any[] = [];
  selectedState: string = '';
  selectedType: string = '';
  appliedFilters: { label: string, type: 'state' | 'type' }[] = [];

  constructor(
    private http: HttpClient,
    private modalTrip: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
  ) {}

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 1000,
    });
    await loading.present();
    return loading;
  }

  hideLoading(loading: any) {
    loading.dismiss();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }

  async ngOnInit() {
    await this.getTravels();
  }

  async getTravels() {
    const loading = await this.showLoading('Loading travels...');
    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels', {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa('ricardo.fernandes@ipvc.pt:H3$kZn7Q')}`,
      }),
    }).subscribe({
      next: (response) => {
        this.travels = response;
        this.filteredTravels = response;
      },
      error: (error) => {
        console.error('Error fetching travels:', error);
      },
      complete: () => {
        this.hideLoading(loading);
      },
    });
  }

  filterTravels(state?: string, type?: string) {
    if (state !== undefined) {
      if (this.selectedState === state) {
        this.selectedState = '';
      } else {
        this.selectedState = state;
      }
      this.updateAppliedFilters(state, 'state');
    }

    if (type !== undefined) {
      if (this.selectedType === type) {
        this.selectedType = '';
      } else {
        this.selectedType = type;
      }
      this.updateAppliedFilters(type, 'type');
    }

    this.filteredTravels = this.travels.filter((travel) => {
      const matchesState = this.selectedState ? travel.state === this.selectedState : true;
      const matchesType = this.selectedType ? travel.type === this.selectedType : true;
      return matchesState && matchesType;
    });
  }

  updateAppliedFilters(filterValue: string, filterType: 'state' | 'type') {
    if (filterValue) {
      const existingFilterIndex = this.appliedFilters.findIndex(f => f.label === filterValue && f.type === filterType);

      if (existingFilterIndex === -1) {
        this.appliedFilters.push({ label: filterValue, type: filterType });
      } else {
        this.appliedFilters = this.appliedFilters.filter(f => f.label !== filterValue || f.type !== filterType);
      }
    } else {
      this.appliedFilters = this.appliedFilters.filter(f => f.type !== filterType);
    }
  }

  async updateTravel(travel: any) {
    const loading = await this.showLoading('Loading travels...');

    this.http.put<any[]>(`https://mobile-api-one.vercel.app/api/travels/${travel.id}`, travel, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      }),
    }).subscribe({
      next: (response) => {
        this.getTravels()
        this.presentToast('Travel updated successfully!');
      },
      error: (error) => {
        console.error('Error updating travel:', error);
        this.presentToast('Error updating travel', 'danger');
      },
      complete: () => {
        console.log('Post request completed.');
      }
    });
  }

  async openTripModalComponent(tripId: string) {
    const selectedTrip = this.travels.find((trip) => trip.id === tripId);

    if (!selectedTrip) {
      console.error('Trip not found');
      return;
    }
    const modalTrip = await this.modalTrip.create({
      component: UpdateModalComponent,
      cssClass: 'modal-fullScreen',
      componentProps: {
        tripId: selectedTrip.id,
        description: selectedTrip.description,
        type: selectedTrip.type,
        state: selectedTrip.state,
        startAt: selectedTrip.startAt,
        endAt: selectedTrip.endAt,
      },
    });

    await modalTrip.present();

    const { data, role } = await modalTrip.onWillDismiss();

    role === 'update' && await this.updateTravel(data)
  }
}
