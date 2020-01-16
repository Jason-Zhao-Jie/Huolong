import CONSTANTS from '../config/constants'
import ModalBase from 'modalBase'
import Modal_Huolong from '../case_huolong/data/modal_huolong'

/**
 * 
 * @param {CONSTANTS.GAMETYPE} gameType 
 * @returns {ModalBase}
 */
export default function(gameType){
    switch(gameType){
        case CONSTANTS.GAMETYPE.HUOLONG:
            return new Modal_Huolong()
        default:
            return new ModalBase()
    }
}
