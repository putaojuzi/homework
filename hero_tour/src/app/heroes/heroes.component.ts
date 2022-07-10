import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  //   id: 1,
  //   name:'Windstorm'
  // };

  heroes: Hero[] = [];
  
  displayedColumns: string[] = ['position', 'name', 'power', 'location','operate'];
  dataSource = this.getHeroes();

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes() // 订阅
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }

  // 删除英雄
  deleteHero(hero:Hero): void{
    // 确定是否删除
    if (!confirm("confirm delete this hero?"))
      return;

    // 首先在页面响应删除指定英雄信息
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe();
  }

  // 修改英雄信息
  editHero(hero: Hero): void{
    
  }
  
  // 添加英雄信息
  add(name: string,power:string,location:string): void{
    // 去掉名字中可能出现的空格
    name = name.trim();

    // 判断名字是否为空
    if (!name) {
      return;
    }

    // myhero: Hero = { id: 11, name: 'Dr Nice', power: 'super rich', location: 'American' };

    this.heroService.addHero({ name: name, power: power, location: location } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
    
    alert("add successfully！");
  }

}
