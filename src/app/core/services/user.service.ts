import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Interfaz de los métodos 

// Interfaz en caso de error
export class UserNotFoundException extends Error{
  // Si quiero añadir cosas
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id:number=0;
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]> = this._users.asObservable();
  
  constructor(
    private http:HttpClient
  ) { 

  }

  getJwtToken(){
    localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk5MDM3MTQ5LCJleHAiOjE3MDE2MjkxNDl9.NvApkrRe3pDRKa4vv43taSBo8JXm2Cf7jaZTN3v8VC8')
    return localStorage.getItem('jwt')
  }

  public addUser(user:User):Observable<User>{
    var _user:any = {
      name: user.name,
      surname: user.surname,
      age: user.age
    }

    return this.http.post<User>(environment.apiUrl+"/users",_user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
    /*return new Observable<User>(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        user.id = ++this.id;
        _users.push(user);
        this._users.next(_users);
        observer.next(user);
      }, 1000);
    })
    */
  }

  public getAll():Observable<User[]>{
    let headers = new HttpHeaders({'Authorization': `Bearer ${this.getJwtToken()}`});
    /*// Si coincide el tipo de datos que recibo con mi interfaz
    return this.http.get<User[]>(environment.apiUrl+'/api/users/?fields[0]=name&fields[1]=surname&fields[2]=age&fields[3]=fav', {headers:headers}).pipe(tap((users:any[])=>{
      this._users.next(users);}));
      */
    return new Observable(observer=>{
      setTimeout(() => {
        var users:User[] = [
          {id: 1, name:"Juan A.", surname:"garcía gómez", age:46, fav:true},
          {id: 2, name:"Alejandro", surname:"garcía gómez", age:45, fav:true},
          {id: 3, name:"juan", surname:"garcía Valencia", age:4, fav:false},
          {id: 4, name:"María del Mar", surname:"Valencia Valencia", age:46, fav:true},
          {id: 5, name:"Lydia", surname:"garcía Robles", age:11, fav:false}
        ];
        this.id=5;
        this._users.next(users);
        observer.next(users);
        observer.complete();  
      }, 1000);
      
    });
  }

  public getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.apiUrl+`/users/${id}`);
    /*
    return new Observable(observer=>{
      setTimeout(() => {
        var user = this._users.value.find(user=>user.id==id);
        if(user)
          observer.next(user);
        else 
          observer.error(new UserNotFoundException());
        observer.complete();
      }, 1000);
      
    })
    */
    
  }

  public updateUser(user:User):Observable<User>{
    return new Observable<User>(obs=>{
      this.http.patch<User>(environment.apiUrl+`/users/${user.id}`,user).subscribe(_=>{
          this.getAll().subscribe(_=>{
            this.getUser(user.id).subscribe(_user=>{
              obs.next(_user);
            })
          })})});
    /*
    return new Observable(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(u=>u.id==user.id);
        if(index<0)
          observer.error(new UserNotFoundException());
        else{
          _users[index]=user;
          observer.next(user);
          this._users.next(_users);
        }
        observer.complete();
      }, 500);
      
    });
    */
    
  }

  public deleteUser(user:User):Observable<User>{
    return new Observable<User>(obs=>{
      this.http.delete<User>(environment.apiUrl+`/users/${user.id}`).subscribe(_=>{
          this.getAll().subscribe(_=>{
            obs.next(user);
          })})});
    /*
    return new Observable(observer=>{
      setTimeout(() => {
        var _users = [...this._users.value];
        var index = _users.findIndex(u=>u.id==user.id);
        if(index<0)
          observer.error(new UserNotFoundException());
        else{
          _users = [..._users.slice(0,index),..._users.slice(index+1)];
          this._users.next(_users);
          observer.next(user);
        }
        observer.complete();
      }, 500);
      
    });
    */
  }

  public deleteAll():Observable<void>{
    return new Observable(observer=>{
      setTimeout(() => {
        this._users.next([]);
        observer.next();
        observer.complete();  
      }, 1000);
    });
  }
}
