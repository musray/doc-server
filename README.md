# 文档生成服务
## 功能介绍
### 基于用户从浏览器提交的信息，将信息填写进预置的docx或xlsx模板，生成用户需要的相关文件。

## TODO
### 整体功能完善
1. 不同文件类型(ied, cin , sw_cd)有不同的req.query，如何处理？
  - 把所有可能的url参数都直接写到app.js里，这样维护起来不容易，但实现起来较方便。
  - 将url参数按照文件类型分组。根据`req.query.documents == "ied | cin | sw_cd"`来判断应该接收那些url参数。

### CPR1000 IED 功能完善
1. BDSD 检查内容表
2. IO List 检查内容表
3. 页面上增加中英文人名；后端增加相应的req.query的获取。


## DONE
1. 完成xlsx-processor.js (2016-7-2)
2. 引入jquery，让select控件的内容可以相互控制。(2016-7-2)
3. 完成cpr1000的ied文档检查内容表选择功能。(2016-7-2)

