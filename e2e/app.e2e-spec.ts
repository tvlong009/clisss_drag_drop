import { ClisssPage } from './app.po';

describe('clisss App', () => {
  let page: ClisssPage;

  beforeEach(() => {
    page = new ClisssPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
