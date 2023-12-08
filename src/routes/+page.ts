import { redirect } from '@sveltejs/kit'
export let load = async () => {
  throw redirect(302, '/al2')
}