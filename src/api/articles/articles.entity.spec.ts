import { ArticlesEntity } from './articles.entity';

describe('ArticlesEntity', () => {
  it('should be defined', () => {
    expect(new ArticlesEntity({})).toBeDefined();
  });
});