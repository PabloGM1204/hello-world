import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, lastValueFrom, map } from 'rxjs';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { UserCredentials } from '../interfaces/user-credentials';
import { StrapiExtendedUser, StrapiLoginPayload, StrapiLoginResponse, StrapiRegisterPayload, StrapiRegisterResponse, StrapiUser } from '../interfaces/strapi';
import { UserRegisterInfo } from '../interfaces/user-register-info';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

  constructor(
    private jwtSvc: JwtService,
    private apiSvc: ApiService
  ) {
    super();
    this.init();
  }

  private init(){
    this.jwtSvc.loadToken().subscribe(_=>{
      console.log(this._logged.value)
      this._logged.next(true);
    })
  }

  public login(credentials:UserCredentials):Observable<void>{
    return new Observable<void>(obs=>{
      const _credentials:StrapiLoginPayload  = {
        identifier:credentials.username,
        password:credentials.password
      }
      this.apiSvc.post("/auth/local", _credentials).subscribe({
        next:async (data:StrapiLoginResponse)=>{
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          let connected = data && data.jwt!='';
          console.log(connected)
          this._logged.next(connected);
          obs.next();
          obs.complete();
        },
        error:err=>{
          obs.error(err);
        }
      });
    });
  }

  public logout(): Observable<void> {
    return this.jwtSvc.destroyToken().pipe(map(_=>{
      return;
    }))
  }

  public  register(info: UserRegisterInfo): Observable<void> {
    return new Observable<void>(obs=>{
      const _info: StrapiRegisterPayload = {
        email: info.emial,
        username: info.nickname,
        password: info.password
      }
      this.apiSvc.post("/auth/local/register", info).subscribe({
        next:async (data:StrapiRegisterResponse) => {
          let connected = data && data.jwt!='';
          this._logged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user: StrapiExtendedUser = {
            name: info.name,
            surname: info.surname,
            user_id: data.user.id
          }
          await lastValueFrom(this.apiSvc.post("/extended_user", _extended_user));
          obs.next();
          obs.complete();
        },
        error: err=>{
          obs.next(err)
        }
      })
    })
  }
  public me(): Observable<User> {
    return new Observable<User>(obs=>{
      this.apiSvc.get('/user/me').subscribe({
        next:async (user:StrapiUser)=>{
          let extended_user = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[user_id]=${user.id}`));
          let ret: User = {
            id: user.id,
            name: extended_user.name,
            surname: extended_user.surname,
            age: 0,
            fav: false
          }
          obs.next(ret);
          obs.complete();
        },
        error: err=>{
          obs.error(err);
        }
      })
    })
  }
}
