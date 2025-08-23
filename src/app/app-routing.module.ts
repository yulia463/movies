import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {MoviePageComponent} from 'src/app/pages/movie-page/movie-page.component'
import {AboutPageComponent} from './pages/about-page/about-page.component'

const routes: Routes = [
  { path: '', component: MoviePageComponent },
  { path: 'about', component: AboutPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
