import { DashboardFeNg4Page } from './app.po';

describe('dashboard-fe-ng4 App', () => {
  let page: DashboardFeNg4Page;

  beforeEach(() => {
    page = new DashboardFeNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
