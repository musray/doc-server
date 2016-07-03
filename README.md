# 文档生成服务
## 功能介绍
### 基于用户从浏览器提交的信息，将信息填写进预置的docx或xlsx模板，生成用户需要的相关文件。

## Code Convention
### HTML
1. HTML property name : proerty_name
### JS Script
1. variable name: camelCase
#### Usage
This is how to define a input element in HTML:

```html
<label for="document_category">选择文件类型</label>
<select id="document-selection" name="document_category">
  <option value="prompt">请选择</option> 
  <option value="ied">IED文件</option> 
  <option value="cin">CIN</option> 
  <option value="sw_cd">软件(光盘)送测</option> 
  <option value="internal">部门文件</option> 
</select>
```

In the JS file:
`var documentCategory = res.query.document_category`

## TODO
### 整体功能完善
2. 列一个可维护的文件类型与url参数的mapping cheatsheet。

### CPR1000 IED 功能完善
1. BDSD 检查内容表
2. IO List 检查内容表
3. IED页面上增加中英文人名；后端增加相应的req.query的获取。
4. 所有Excel版本的文件，要用新建Excel表重制一下。

### CIN功能完善
3. 系统，做成select



## DONE
1. 完成xlsx-processor.js (2016-7-2)
2. 引入jquery，让select控件的内容可以相互控制。(2016-7-2)
3. 完成cpr1000的ied文档检查内容表选择功能。(2016-7-2)
3. 增加项目名称和项目编号的mapping，IED文件内部封面使用。(2016年 7月 3日 星期日 10时56分29秒 )
1. 项目选择，做成select(2016年 7月 3日 星期日 13时36分52秒 CST)
2. 改造阶段，做成select (2016年 7月 3日 星期日 13时37分02秒 CST)
1. 不同文件类型(ied, cin , sw_cd)有不同的req.query，如何处理？
  - 把所有可能的url参数都直接写到~~app.js~~get-data-set.js里，这样维护起来不容易，但实现起来较方便。
  - ~~将url参数按照文件类型分组。根据`req.query.documents == "ied | cin | sw_cd"`来判断应该接收那些url参数~~。
