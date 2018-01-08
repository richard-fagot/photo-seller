import { PhotoSellerPage } from './app.po';

describe('photo-seller App', function() {
  let page: PhotoSellerPage;

  beforeEach(() => {
    page = new PhotoSellerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
