import {useState} from "react";
import { getFactura, getFacturaByUser, postFactura } from "../../services/api";
import Swal from "sweetalert2";

export const useFacturas = ()=>{
    const [facturas, setFacturas] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    
    const handleGetFacturas = async () => {
        setIsLoading(true);
        try {
            const response = await getFactura();
            if(response?.data?.facturas){
                setFacturas(response.data.facturas);
            }else{
                throw new Error('Algo salio mal, error al cargar facturas');
            }
        } catch (e) {
            const msg = e.response?.data?.msg || e.message || 'Error!';
            Swal.fire({
                icon:'error',
                title:'Error',
                text:msg
            })
        }finally{
            setIsLoading(false)
        }
    }

        const handleGetFacturaByUser = async () => {
        setIsLoading(true);
        try {
            const response = await getFacturaByUser();
            if(response?.data?.facturas){
                setFacturas(response.data.facturas);
            }else{
                throw new Error('Algo salio mal, error al cargar facturas');
            }
        } catch (e) {
            const msg = e.response?.data?.msg || e.message || 'Error!';
            Swal.fire({
                icon:'error',
                title:'Error',
                text:msg
            })
        }finally{
            setIsLoading(false)
        }
    }

        const handlePostFactura = async (data) => {
        setIsLoading(true);
        try {
            const response = await postFactura(data);
            if(response?.data?.facturas){
                const newFactura = response.data.facturas;
                setFacturas(prev => [...prev,newFactura]);
                Swal.fire({
                    icon:'success',
                    title:'Exito',
                    text:response.data.message || 'Factura emitida exitosamente'
                })
            }else{
                throw new Error('Algo salio mal, error al generar facturas');
            }
        } catch (e) {
            const msg = e.response?.data?.msg || e.message || 'Error!';
            Swal.fire({
                icon:'error',
                title:'Error',
                text:msg
            })
        }finally{
            setIsLoading(false)
        }
    }

    return {handleGetFacturaByUser, handleGetFacturas, handlePostFactura, facturas, isLoading}
}