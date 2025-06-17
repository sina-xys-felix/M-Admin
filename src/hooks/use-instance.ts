
export function useCompInstance<T extends new abstract(...args:any)=>any >(_comp:T)=>{
    return ref<InstanceType<T>>()
}

// import { Form } from '@arco-design/web-vue'
// import { useCompInstance } from '@/hooks/use-instance'

// const formRef = useCompInstance<typeof Form>()

