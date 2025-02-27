import {Component, OnInit} from '@angular/core';
import {AlertController, IonicModule, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {UpdateModalComponent} from "../../components/update-modal/update-modal.component";

type Travels = {
  locations: Location[]
  id: string
  type: string
  description: string
  state: string
  startAt: Date
  endAt: Date
  isFav: boolean,
}

type Location = {
  id: string
  type: string
  description: string
  state: string
  startAt: Date
  endAt: Date
}

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
  imports: [IonicModule, CommonModule, SharedModule],
  standalone: true,
})
export class TravelsPage implements OnInit {
  travels: Travels[] = [];
  filteredTravels: Travels[] = [];
  selectedState: string = '';
  selectedType: string = '';
  selectedFavourite: string = '';
  appliedFilters: { label: string, type: 'state' | 'type' }[] = [];

  constructor(
    private http: HttpClient,
    private modalTrip: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 1000,
    });
    await loading.present();
    return loading;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.filteredTravels = this.travels.filter((travel) =>
      travel.description.toLowerCase().includes(query)
    );
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
    const loading = await this.showLoading('Loading Trips...');
    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels', {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa('ricardo.fernandes@ipvc.pt:H3$kZn7Q')}`,
      }),
    }).subscribe({
      next: (response) => {
        this.travels = response.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
        this.filteredTravels = response.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
      },
      error: (error) => {
        console.error('Error fetching Trips:', error);
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
        this.appliedFilters.push({label: filterValue, type: filterType});
      } else {
        this.appliedFilters = this.appliedFilters.filter(f => f.label !== filterValue || f.type !== filterType);
      }
    } else {
      this.appliedFilters = this.appliedFilters.filter(f => f.type !== filterType);
    }
  }

  async updateTravel(travel: any) {
    await this.showLoading('Loading Trip...');

    this.http.put<any[]>(`https://mobile-api-one.vercel.app/api/travels/${travel.id}`, travel, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      }),
    }).subscribe({
      next: (response) => {
        this.getTravels()
        this.presentToast('Trip updated successfully!');
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
        locations: selectedTrip.locations,
      },
    });

    await modalTrip.present();

    const {data, role} = await modalTrip.onWillDismiss();

    if (role === 'update' && data) {
      await this.updateTravel(data); // Update travel
    } else if (role === 'delete' && data.tripId) {
      await this.confirmDelete(data.tripId); // Trigger delete confirmation
    }
  }

  async confirmDelete(tripId: string) {
    console.log("Confirm delete for tripId:", tripId); // Debug log
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this Trip?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log("Deleting trip with ID:", tripId); // Debug log
            this.deleteTravel(tripId); // Call the delete method
          },
        },
      ],
    });

    await alert.present();
  }

  deleteTravel(tripId: string) {
    this.http.delete(`https://mobile-api-one.vercel.app/api/travels/${tripId}`, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`,
      }),
    }).subscribe({
      next: () => {
        this.presentToast('Trip deleted successfully!');
        this.getTravels();
      },
      error: (error) => {
        console.error('Error deleting travel:', error);
        this.presentToast('Error deleting travel', 'danger');
      },
    });
  }

  updateFavorite(event: { travelId: string, isFav: boolean }) {
    const body = {isFav: event.isFav};

    this.http.put(`https://mobile-api-one.vercel.app/api/travels/${event.travelId}`, {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa('ricardo.fernandes@ipvc.pt:H3$kZn7Q')}`,
      }),
    }).subscribe({
      next: (response) => {
        console.log('Favorite status successfully updated on the server');
        // Optionally, show a success message
        this.presentToast('Favorite updated successfully!');
      },
      error: (error) => {
        console.error('Error updating favorite status:', error);
        // Optionally, show an error message
        this.presentToast('Error updating favorite status', 'danger');
      },
    });
  }
}
