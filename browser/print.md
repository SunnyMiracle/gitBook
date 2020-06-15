# 浏览器打印

- 调用浏览器打印功能，无兼容性问题。
```
window.print(); 
```
- 但是浏览器默认的打印配置有页眉页脚，也有边距；但是这些东西往往不是我们希望的。
- 某些时候甚至希望网页中的类似section能够单独进行拆分打印（不管当前section内容是否沾满了一页，都要保证每一张纸都仅展示当前section内容）。
上边两个问题正好可以通过css来进行处理。
- link标签设置media属性，在打印中应用该样式，支持内联以及引入外部样式文件。
```
<link rel="stylesheet" media="print" href="print.css">
```
  或者通过 媒体查询类针对个别样式进行定制。
  
``` css
@media print {
    xxx.{
        break-after: page;
        page-break-after: always;   
    }
}
```

  这两个属性可以保证在打印的时候可以进行自动分页，这两个属性不在此赘述，详情看MDN

- @page 规则用于在打印文档时修改某些CSS属性。你不能用@page规则来修改所有的CSS属性，而是只能修改margin,orphans,widow 和 page breaks of the document。

对其他属性的修改是无效的。这样可以去掉默认的边距，同时也可以去掉页眉页脚。 
```
@page {
    margin: 0;
}
```

