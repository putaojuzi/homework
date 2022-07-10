import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHeroById();
  }

  // 通过Id 获取英雄
  getHeroById(): void{
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHeroById(id).
      subscribe(hero => this.hero = hero);
  }

  // 返回上一级
  goBack(): void{
    this.location.back();// 类似浏览器的返回上一级的按钮。
  }

  // 保存页面修改
  save(): void {
  if (this.hero) {
    // 修改成功后，回退上一级页面
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}

}
