import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false){

    if (pull){
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost( post ){
    
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {
      this.http.post(`${URL}/posts`,post,{headers})
      .subscribe(resp => {
        this.newPost.emit(resp['post']);
        resolve(true);
      });
    });

    
  }


  uploadImages( img: string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img,`${URL}/posts/upload`,options)
      .then( resp => {
        console.log(resp);
      }).catch( err => {
        console.log('Error en la carga ',err);
      })
  }
}
