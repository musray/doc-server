# 文档生成服务
## 功能介绍
### 基于用户从浏览器提交的信息，将信息填写进预置的docx或xlsx模板，生成用户需要的相关文件。

## Code Convention

### HTML
1. HTML property name: `<input type="text" name="document_selection" id="doc_select">`

This is how to define a input element in HTML:
```html
<select id="document-selection" name="document_category">
  <option value="prompt_line">请选择</option> 
  <option value="ied_document">IED文件</option> 
</select>
```

### JS Script
1. JS Script's Name: `a-js-script-file.js`
1. variable name: `camelCase`

In the JS file:
```var documentCategory = res.query.document_category```


## TODO

### 整体功能完善
2. 列一个可维护的文件类型与url参数的mapping cheatsheet。
1. 选择了大的项目之后，自动改变文件内容view里项目名称的选择。例如选择了YJ56之后，在文件内容的下拉列表里只有YJ5或者YJ6的选择。


### CPR1000 IED 功能完善
1. 增加软件送测单及光盘检查内容表。

### YJ56 功能
1. 增加各类文件的检查内容表


### CIN功能完善
3. 系统，做成select
1. cin_cover里，签名改成变量名

## Change Log

####v0.0.2
3. IED页面上增加中英文人名；后端增加相应的req.query的获取。
1. BDSD 检查内容表 2016年 7月 4日 星期一 13时20分06秒 CST
2. IO List 检查内容表 2016年 7月 4日 星期一 13时20分06秒 CST
3. ~~Layout 检查内容表~~  2016年 7月 4日 星期一 13时20分06秒 CST
4. 所有Excel版本的文件，要用新建Excel表重制一下。2016年 7月 4日 星期一 13时20分06秒 CST
3. 将当前所有写在JS里的HTML，整理到一个文件里去。日后只在这个文件里对HTML模版进行维护。2016年 7月 5日 星期二 13时19分57秒 CST
4. 在后端生成项目名称和项目编码。2016年 7月 5日 星期二 13时19分57秒 CST



####v0.0.1
1. 完成xlsx-processor.js (2016-7-2)
2. 引入jquery，让select控件的内容可以相互控制。(2016-7-2)
3. 完成cpr1000的ied文档检查内容表选择功能。(2016-7-2)
3. 增加项目名称和项目编号的mapping，IED文件内部封面使用。(2016年 7月 3日 星期日 10时56分29秒 )
1. 项目选择，做成select(2016年 7月 3日 星期日 13时36分52秒 CST)
2. 改造阶段，做成select (2016年 7月 3日 星期日 13时37分02秒 CST)
1. 不同文件类型(ied, cin , sw_cd)有不同的req.query，如何处理？(2016年 7月 4日 星期一 08时03分32秒 CST) 
  - 把所有可能的url参数都直接写到 ~~app.js~~ **get-data-set.js**里，这样维护起来~~不~~容易，~~但~~实现起来较方便。
  - ~~将url参数按照文件类型分组。根据`req.query.documents == "ied | cin | sw_cd"`来判断应该接收那些url参数~~。
