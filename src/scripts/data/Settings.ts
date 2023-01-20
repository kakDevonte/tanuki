import langs from '../data/langs';

class Settings {
  public readonly sizes = {
    width: 720,
    minHeight: 911,
    maxHeight: 1620,
  };
  public readonly lang: { [key: string]: string } = langs.ru;
  private _mobile: boolean = false;

  public isMobile(): boolean {
    return this._mobile;
  }

  public setMobile(mobile: boolean): boolean {
    this._mobile = mobile;
    return this._mobile;
  }
}

export default new Settings();
