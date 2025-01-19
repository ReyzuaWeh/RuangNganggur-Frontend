interface TokenDecrypt {
    sub: string
    exp: Number
    role: string
    subsubject: string | null
}
export type { TokenDecrypt }
