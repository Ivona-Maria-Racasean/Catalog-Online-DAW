export interface LoginResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  jwToken: string;
}
