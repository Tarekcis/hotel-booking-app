import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BookRoomComponent,
    MyBookingComponent
  ],
  exports: [
    BookRoomComponent,
    MyBookingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: 'book-room', component: BookRoomComponent, pathMatch: 'full', data: { title: 'Book Room' } },
      { path: 'my-booking', component: MyBookingComponent, pathMatch: 'full', data: { title: 'My Booking' } }
    ])
  ]
})
export class RoomBookingModule { }
