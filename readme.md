https://docs.google.com/presentation/d/15fz7saxt-Rz-LwErV8U3wPUJM2VepHrayWpcqP0dVfg/edit#slide=id.g308a1677566_0_0


resources:
https://colab.research.google.com/drive/1y3Rx4jA745t72b2UVyPFD57pyXcsYLzf?usp=sharing
https://colab.research.google.com/drive/1gDERVz3Vy--OriQ5uVTY7MW_uNlxO3tz?usp=sharing

**References**:

a. https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/





The reason may cause the layout: forced synchronous layouts

- Avoid forced synchronous layouts and layout thrashing; read style values then make style changes: separate the read and write







b. https://developers.google.com/speed/docs/insights/browser-reflow



some points when developing

https://developers.google.com/speed



**c.** https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg

repaint reflow and re-render

Don't change individual styles, one by one.





https://juejin.cn/post/6844904083212468238





https://juejin.cn/post/7067087200143278116

![image-20241112154110810](readme.assets/image-20241112154110810.png)





[**Modular Responsive Web Design using Element Queries**](./references/1511.01223v1.pdf)

Most about how to avoid it during the development 



we need to give some solutions to the user





The list for developers: https://gist.github.com/paulirish/5d52fb081b3570c81e3a

# For User




1. summary
definition

  cls
  fcp
  lcp
  
  说明影响 

展示图片： measurement of layout thrashing

2. analysis the layout code: 
    展示 html 的 inp time
3. rdy solutions: 
    This software solution is feasible: 

    Future limitation: 由于浏览器的 同源策略 限制，直接通过 JavaScript 脚本访问第三方网站的 DOM 内容是不允许的


4. 问问题：这个项目具体是 layout thrashing 和 reflow 还是带来的结果 