import{j as e}from"./vendor-radix-DhC7U5AL.js";import{r as l}from"./vendor-react-CHsotXBh.js";import{S as h}from"./SectionHeading-D6V5ft_-.js";import{S as m}from"./index-DbNzUDC4.js";import{u as p,m as a}from"./vendor-motion-BUzW38se.js";import{i as x}from"./vendor-misc-C6sAk24p.js";const d="prajjwalsahuu.hashnode.dev";async function g(){var s,t,c;const n=`
    query {
      publication(host: "${d}") {
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              coverImage { url }
            }
          }
        }
      }
    }
  `,i=await(await fetch("https://gql.hashnode.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:n})})).json();return(((c=(t=(s=i==null?void 0:i.data)==null?void 0:s.publication)==null?void 0:t.posts)==null?void 0:c.edges)??[]).map(u=>u.node)}function N(){const n=p(),[r,i]=l.useState([]),[o,s]=l.useState(!0);return l.useEffect(()=>{g().then(i).catch(()=>i([])).finally(()=>s(!1))},[]),!o&&r.length===0?null:e.jsxs(a.section,{id:"blog",className:"py-8","aria-label":"Blog",...!n&&{initial:{clipPath:"inset(0 0 100% 0)"},whileInView:{clipPath:"inset(0 0 0% 0)"},viewport:{once:!0,margin:"-60px"},transition:{duration:.65,ease:[.16,1,.3,1]}},children:[e.jsx(a.div,{initial:{scaleX:0,originX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:.5,ease:"easeOut"},children:e.jsx(m,{className:"mb-8 opacity-30"})}),e.jsx(h,{children:"writing"}),o?e.jsx("div",{className:"space-y-3",children:[1,2,3].map(t=>e.jsx("div",{className:"h-10 bg-muted/40 rounded animate-pulse"},t))}):e.jsx(a.div,{className:"space-y-0",initial:"hidden",whileInView:"show",viewport:{once:!0},variants:{hidden:{},show:{transition:{staggerChildren:.08}}},children:r.slice(0,5).map(t=>e.jsxs(a.a,{href:`https://${d}/${t.slug}`,target:"_blank",rel:"noreferrer",variants:{hidden:{opacity:0,y:14},show:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}}},whileHover:{x:4,transition:{duration:.2}},className:"flex items-baseline justify-between gap-4 py-3 border-b border-border/30 last:border-0 group",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsxs("p",{className:"text-sm font-medium group-hover:text-accent-pink transition-colors truncate",children:[t.title," ",e.jsx(x,{className:"inline h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity"})]}),t.brief&&e.jsx("p",{className:"text-xs text-muted-foreground mt-0.5 line-clamp-1",children:t.brief})]}),e.jsxs("div",{className:"flex items-center gap-2 shrink-0 text-xs text-muted-foreground/70",children:[t.readTimeInMinutes&&e.jsxs("span",{children:[t.readTimeInMinutes," min"]}),e.jsx("span",{children:new Date(t.publishedAt).toLocaleDateString("en-US",{month:"short",year:"numeric"})})]})]},t.id))})]})}export{N as Blog};
