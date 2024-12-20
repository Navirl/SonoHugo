---
title: "GrappleTest"
date: 2024-12-20T14:17:04+09:00
---
```csharp

//鉄2,木1とする

class GrapplingMethodClass{
	int useItemFind(Item)//アイテムを指定すると、それが何個必要になるか返してくれる便利関数
	
Item GrapplingMethod(Storage s){
	bool iron;
	bool wood;
	foreach i in s.itemlist{
		if(i == Iron)
		{
			if(s.findbackpacknumber(iron)>GrapplingData.useItemFind(Iron))
			{
				iron = true;
			}
		}
		
		}
		if(i == Wood){
			//鉄と同じ奴、なんか一般化できそう……
		}
	}
}
}
//このクラスをバックパックは収容する
class　item{

}

//このインターフェースがついてるやつが、プレイヤーが触れるアイテム
interface useItem{

}



abstract class craftedItem extends Item{
	abstract int ID
	abstract protected item[] useItem//外側からはIDにアクセスしたほうがいいので
	abstract int[] itemIDlist
	abstract int[] needItemNumber
	
}

class GrapplingData extends craftedItem implements useItem{
	int ID = 44
	item[] useItem = new item("Iron,Wood")　//ここでは読みやすく名称をそのまま使うが、どっかでIDに直したほうがいい
	int[] itemIDlist = new int[](1,2) // IronとWoodのID、ID変換メソッドかなんかに通す
	int[] needItemNumber = new int[](ironnum:30, woodnum:20) //べたうちよくない
}

class ItemDataList{
	
}
```

バックパックと


アイテムのリストを貰い、

アイテム
アイテム of number in バックパック内

backpack
	item
		number
		tags
		ID


アイテムをいつデータとメソッドに分ける？
二つを同時にデータとメソッドに分けると、管理がだるい。
このアイテムについて知りたいのに、データとメソッドが同時に出てこずアイテムとして成立しないのは問題では。
→管理クラスで纏めればいい
