## 目标

This is the component library for HF software's shift management functionalities.

## 结构

- The library should be published as a npm package on npm server (such as Verdaccio)
- Library files
  - lib/components/routesSummary.tsx defines the exported routing path.
  - lib/main.ts defines all the exported components.
- Small hosting server
  - src/App.tsx defines the components that will be displayed in the hosting app.
  - You could expose all the routes in the following way:

```typescript
// App.tsx
import "./App.css";

// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { RoutesSummry } from "@hf/shiftmanagement";

function App() {
  return (
    <>
      <RoutesSummry></RoutesSummry>
    </>
  );
}

export default App;
```

```typescript
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- Package repository
  - The publishing registry is set inside package.json file as "publishConfig.registry" property.
  - Recommend to use pnpm as package manager.

## 如何使用

1. Within this project directory, Run command "pnpm install" to install all necessary packages.
2. Modify the "name" and "version" property inside the package.json file.
3. Run command "pnpm run build-dev" to package the entire component library.
4. Run command "pnpm run dev" and open port on localhost:3000 (by default). Navigate to the path defined in routesSummary.tsx to view the corresponding page.
5. Make sure that private npm registry is up and running
   - If verdaccio is used and it is hosted locally, you could start it with command "verdaccio"
6. Run command "pnpm publish"
7. Check the private repository online (e.g. http://localhost:4873), to make sure that the package gets published successfully.

## 此模块中未完成功能

- 支持跨天排班
  - 未进行原因：前端 UI 设计未终结，后端改动较大
    1. 原来排产到天，跨天需要支持排产到小时
    2. 需要做排产重叠检查，后端需要暴露新的 API
- 支持手动调整班次时间长短
- 生成工作日历时，若生成期间已经有数据，是否需要提醒用户将覆盖部分日期
