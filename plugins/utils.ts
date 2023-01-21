import { Context, Plugin } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import _ from 'lodash'
import moment from 'jalali-moment'
import { v4 as uuidv4 } from 'uuid';
export class UtilsPlugin {
  public $_: _.LoDashStatic = _
  public baseUrlImage: string = 'http://cdn.skanetplus.ir'
  convertDateMiladiToShamsi(data: string) {
    return moment(data).format('YYYY-MM-DD')
  }
  public convertPrice(price: string) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public formatValue(value: any) {
    Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
      notation: 'compact',
    }).format(value);
  }

  public uuidv4() {
    return uuidv4()
  }

  public dateToday() {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric', };
    const date = new Date();
    const dayName = date.toLocaleDateString('fa-IR', { weekday: 'long' });
    const hourToday = `${date.getHours()}:${date.getMinutes()}`;
    const today: any = date.toLocaleDateString('fa-IR', options);
    return `${dayName} ${today} | ${hourToday} `
  }

  public persianDayOfWeek(day: string) {
    let text: string = ''
    switch (day) {
      case 'Sunday':
        text = 'یکشنبه'
        break;
      case 'Monday':
        text = "دوشنبه";
        break;
      case 'Tuesday':
        text = 'سه شنبه';
        break
      case 'Wednesday':
        text = 'چهار شنبه'
        break
      case 'Thursday':
        text = 'پنج شنبه'
        break
      case 'Friday':
        text = "Friday"
        break
      case 'Saturday':
        text = 'شنبه'
      // eslint-disable-next-line no-fallthrough
      default:
        text = "";
    }
    return text
  }

  differences = (newObj: any, oldObj: any) => {
    return this.$_.reduce(
      newObj,
      (result: any, value: any, key: any) => {
        if (!this.$_.isEqual(value, oldObj[key])) {
          if (this.$_.isArray(value)) {
            result[key] = []
            this.$_.forEach(value, (innerObjFrom1, index) => {
              if (this.$_.isNil(oldObj[key][index])) {
                result[key].push(innerObjFrom1)
              } else {
                const changes = this.differences(
                  innerObjFrom1,
                  oldObj[key][index]
                )
                if (!this.$_.isEmpty(changes)) {
                  result[key].push(changes)
                }
              }
            })
          } else if (this.$_.isObject(value)) {
            result[key] = this.differences(value, oldObj[key])
          } else {
            result[key] = value
          }
        }
        return result
      },
      {}
    )
  }

  isObjectFilled = (obj: object) => {
    return Object.values(obj).filter((value) => !!value).length > 0
  }

  public errorMessage(error: any) {
    if (error.response.data.statusCode === 400) {
      return error?.response?.data.message
    }
  }
  public convertDateToMiladi(date: string) {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    ///@ts-ignore
    let convertDate: any = new Date(date).toLocaleDateString('en-US', options);
    const time = `${new Date(date).getHours()}` + ':' + `${new Date().getMinutes() < 10 ? '0' : ''}` + `${new Date().getMinutes()}`
    return `${time} ${convertDate}`
  }
  public getImageUrl(file_name: string) {
    return `${this.baseUrlImage}${file_name}`
  }
  public getSlug(str: string) {
    let titleStr = str.replace(/^\s+|\s+$/g, '');
    titleStr = titleStr.toLowerCase();
    //persian support
    titleStr = titleStr.replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-');
    titleStr = titleStr;
    return titleStr;
  }
}
const plugin: Plugin = function (_ctx: Context, inject: Inject) {
  inject('utils', new UtilsPlugin())
}
export default plugin