import { DynamicPropertyPipe } from './dynamic-property.pipe';

describe('DynamicPropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new DynamicPropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
