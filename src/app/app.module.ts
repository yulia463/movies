import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {MovieComponent} from 'src/app/components/movie/movie.component'
import {HttpClientModule} from '@angular/common/http'
import {GlobalErrorComponent} from './components/global-error/global-error.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FilterMoviesPipe} from 'src/app/pipes/filter-movies.pipe'
import {ModalComponent} from './components/modal/modal.component'
import {CreateMovieComponent} from 'src/app/components/create-movie/create-movie.component'
import {FocusDirective} from './directives/focus.directive'
import {MoviePageComponent} from 'src/app/pages/movie-page/movie-page.component'
import {AboutPageComponent} from './pages/about-page/about-page.component';
import { NavigationComponent } from './components/navigation/navigation.component'

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    GlobalErrorComponent,
    FilterMoviesPipe,
    ModalComponent,
    CreateMovieComponent,
    FocusDirective,
    MoviePageComponent,
    AboutPageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
