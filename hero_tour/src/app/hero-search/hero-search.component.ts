import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService:HeroService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
  // 如果在300ms 内没有再次发起请求
    debounceTime(300),

    // 判断过滤条件是否发生变化，只有在发生变化的时候才会发送请求
    distinctUntilChanged(),

    // 为通过筛选的关键字 调用搜索服务
    switchMap((key: string) => this.heroService.searchHeroes(key)),
    )

    
  }

  search(key: string):void {
    this.searchTerms.next(key);
  }

}
