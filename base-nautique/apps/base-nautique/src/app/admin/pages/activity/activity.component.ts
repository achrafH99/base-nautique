import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity, ActivityService } from '../../../core/services/activity.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-activity',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css',
})
export class ActivityComponent implements OnInit {
  activityForm!: FormGroup;
  activities: Activity[] = [];
  isLoading = false;
  error: string | null = null;
  showForm = false;
editingActivity: Activity | null = null

  constructor(private activityService: ActivityService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    })
    this.fetchActivities();
  }

  toggleForm(): void {
  this.showForm = !this.showForm;
  if (!this.showForm) {
    this.editingActivity = null;
    this.activityForm.reset();
  }
}

  fetchActivities(): void {
    this.isLoading = true;
    this.error = null;

    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Une erreur est survenue lors du chargement des activités.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onDeleteActivity(activity: Activity): void {
   this.activityService.removeActivity(activity._id.toString()).subscribe(() => {
      this.fetchActivities();
   })
  }

  
onEditActivity(activity: Activity): void {
  this.activityForm.patchValue(activity);
  this.editingActivity = activity;
  this.showForm = true;
}

  onAddActivity(): void {
    // Rediriger ou ouvrir un modal
    alert('Ajouter une nouvelle activité');
  }

  onCreateActivity(): void {
  if (this.activityForm.invalid) return;

  const newActivity = this.activityForm.value;

  this.activityService.createActivity(newActivity).subscribe({
    next: (created) => {
      this.activities.push(created);
      this.activityForm.reset();
    },
    error: (err) => {
      this.error = 'Erreur lors de la création.';
      console.error(err);
    }
  });
}

onSubmit(): void {
  if (!this.activityForm.valid) return;

  const formValue = this.activityForm.value;

  if (this.editingActivity) {
    console.log("here")
this.activityService.updateActivity(this.editingActivity._id.toString(), formValue)
      .subscribe({
        next: (updated) => {
          console.log('Mise à jour réussie:', updated);
          // Met à jour la liste locale avec la nouvelle version
          const index = this.activities.findIndex(a => a._id === updated._id);
          if (index !== -1) this.activities[index] = updated;
          this.toggleForm();
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour.';
          console.error(err);
        }
      });
          console.log('Mise à jour :', { ...this.editingActivity, ...formValue });
  } else {
    this.activityService.createActivity(formValue).subscribe(() => {
      this.fetchActivities();
      this.toggleForm();
    });
  }
}
}
