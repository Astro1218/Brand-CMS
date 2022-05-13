import { BrandedSitesCmsPage } from './app.po';

describe('branded-sites-cms App', () => {
  let page: BrandedSitesCmsPage;

  beforeEach(() => {
    page = new BrandedSitesCmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
