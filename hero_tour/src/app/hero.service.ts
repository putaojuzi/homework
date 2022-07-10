import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes(unuse)';
import { MessageService } from './message.service';
// 从服务器取数据
import { HttpClient, HttpHeaders } from '@angular/common/http';
// 用于错误处理
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageServie: MessageService,
    private http:HttpClient,
  ) { }

  private heroesUrl = 'api/heroes';  // URL to web api

  // 设置请求头
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // GET heroes from mock-heroes
  // getHeroes(): Observable<Hero[]>{
  //   const heroes = of(HEROES);
  //   this.messageServie.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    // 
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  

  // 登记日志
  private log(message: string) {
    this.messageServie.add(`HeroService:${message}`);
  }

  // 通过用户id 获取数据
  getHeroById(id: number): Observable<Hero>{
    // const hero = HEROES.find(hero => hero.id === id)!;// 如果确定一定能按照id 找到对象，在末尾添加！,除去undefined 清空
    // this.messageServie.add(`HeroService:fetched hero id=${hero.id}`);
    // 反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    // return of(hero);

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
       tap(_ => this.log(`fetched hero id=${id} `)),
       catchError(this.handleError<Hero>(`getHeroById id=${id}`))
    );
    
  }

  // 修改英雄信息(不能定义为 private)
  public updateHero(hero: Hero):Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  // 添加英雄信息
  public addHero(hero: Hero):Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  // 通过点击事件，删除英雄信息
  public deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  // 通过关键字搜索英雄信息
  searchHeroes(key: string): Observable<Hero[]>{
    if (!key.trim()) {
      // 如果字符串为空
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${key}`).pipe(
      // 三元表达式 记录 搜索情况
      tap(x => x.length ?
        this.log(`found heroes matching "${key}"`) :
        this.log(`no heroes matching "${key}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
