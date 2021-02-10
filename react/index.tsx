import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

declare global {
  interface Window {
    adCartAdv: any;
  }
}

function saveCart(items: any){
  const cart = items.map((sku: any) => ({
    product_id: sku.productId,
    merchant_id: sku.skuId,
    price: +sku.price/100,
    quantity: sku.quantity
  }))

  window.adCartAdv.updateCart(cart)
}

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      break
    }
    case 'vtex:cartChanged': {
      saveCart(e.data.items)
      return
    }
    case 'vtex:orderPlaced': {
      window.adCartAdv.convert(e.data.transactionId, +e.data.transactionTotal/100)
      return
    }
    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
