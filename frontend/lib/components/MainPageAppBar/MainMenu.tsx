import { globalMenuBar } from "./MenuHierachy";
import { DisplaySingleMenu } from "./DisplaySingleMenu";

export function MainMenu() {
  const result: JSX.Element[] = [];

  globalMenuBar.menus.map((topLevelMenu) => {
    result.push(
      DisplaySingleMenu(
        topLevelMenu.key,
        topLevelMenu.menuName,
        topLevelMenu.menuItems
      )
    );
  });

  return result;
}
