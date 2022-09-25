import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
import "../../styles/index.scss";
const defaultProps: ButtonProps = {
  onClick: jest.fn(),
};
const customProps: ButtonProps = {
  onClick: jest.fn(),
  className: "myClassName",
  buttonType: "primary",
  size: "lg",
};
const linkProps: ButtonProps = {
  buttonType: "link",
  href: "http://www.sss.com",
};

const disabledProps: ButtonProps = {
  onClick: jest.fn(),
  disabled: true,
};

describe("test the Button component", () => {
  it("should render the default button with no props", () => {
    render(<Button {...defaultProps}>default</Button>);
    const ele = screen.getByText("default") as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toBe("BUTTON");
    expect(ele.disabled).toBeFalsy();
    expect(ele).toHaveClass("btn btn-default");
    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the custom button with props", () => {
    render(<Button {...customProps}>custom</Button>);
    const ele = screen.getByText("custom") as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("btn btn-primary btn-lg myClassName");
    fireEvent.click(ele);
    expect(customProps.onClick).toHaveBeenCalled();
  });
  it("should render a link if btnType is link and href is provided", () => {
    render(<Button {...linkProps}>link</Button>);
    const ele = screen.getByText("link");
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toBe("A");
    expect(ele).toHaveClass("btn btn-link");
  });
  it("should render the disabled button if diable prop is true", () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const ele = screen.getByText("disabled") as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.disabled).toBeTruthy();
  });
});
