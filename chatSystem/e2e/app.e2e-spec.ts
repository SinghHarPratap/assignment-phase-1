import { AppPage } from "./app.po";

describe("Chat App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should be on home page", () => {
    expect(page.getParagraphText()).toEqual("");
  });
});
