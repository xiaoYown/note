// 以 <div> 起 </div> 结束, 匹配中间字符
'<div>11</div><div>22</div>'.match(/(?<=<div>)[\s\S]*?(?=<\/div>)/g)