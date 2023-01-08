export interface LoginResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}
