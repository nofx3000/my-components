import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./submenu";

const testMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
      <SubMenu title="submenu">
        <MenuItem>sub</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const verticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const createStyleFile = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  return style;
};

let menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe("test Menu and MenuItem components", () => {
  beforeEach(() => {
    const view: RenderResult = render(testMenu(testProps));
    view.container.append(createStyleFile());
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElement = screen.getByText("disabled");
  });
  it("should be rendered correctly with default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toBe(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("should change into active and invoke the callback when click", () => {
    expect(menuElement).toBeInTheDocument();
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("menu-item is-active");
    expect(activeElement).not.toHaveClass('("menu-item is-active")');
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('("menu-item is-active")');
    // 携带参数就要用toHaveBeenCalledWith(arguments)， 不能用toHaveBeenCalled()
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should become vertical when the mode is set to be vertical", () => {
    cleanup();
    render(testMenu(verticalProps));
    menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show submenu when mouse enter submenu title", async () => {
    const subMenu = screen.getByText("submenu");
    const subItem = screen.getByText("sub");
    expect(subItem).not.toBeVisible();
    fireEvent.mouseEnter(subMenu);
    await waitFor(() => {
      expect(subItem).toBeVisible();
    });
    fireEvent.mouseLeave(subMenu);
    await waitFor(() => {
      expect(subItem).not.toBeVisible();
    });
  });
});
