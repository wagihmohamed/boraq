export const governorateArabicNames = {
  AL_ANBAR: 'الأنبار',
  BABIL: 'بابل',
  BAGHDAD: 'بغداد',
  BASRA: 'البصرة',
  DHI_QAR: 'ذي قار',
  AL_QADISIYYAH: 'القادسية',
  DIYALA: 'ديالى',
  DUHOK: 'دهوك',
  ERBIL: 'أربيل',
  KARBALA: 'كربلاء',
  KIRKUK: 'كركوك',
  MAYSAN: 'ميسان',
  MUTHANNA: 'المثنى',
  NAJAF: 'النجف',
  NINAWA: 'نينوى',
  SALAH_AL_DIN: 'صلاح الدين',
  SULAYMANIYAH: 'السليمانية',
  WASIT: 'واسط',
};

enum Governorate {
  AL_ANBAR = 'الأنبار',
  BABIL = 'بابل',
  BAGHDAD = 'بغداد',
  BASRA = 'البصرة',
  DHI_QAR = 'ذي قار',
  AL_QADISIYYAH = 'القادسية',
  DIYALA = 'ديالى',
  DUHOK = 'دهوك',
  ERBIL = 'أربيل',
  KARBALA = 'كربلاء',
  KIRKUK = 'كركوك',
  MAYSAN = 'ميسان',
  MUTHANNA = 'المثنى',
  NAJAF = 'النجف',
  NINAWA = 'نينوى',
  SALAH_AL_DIN = 'صلاح الدين',
  SULAYMANIYAH = 'السليمانية',
  WASIT = 'واسط',
}

export const governorateArray: { label: string; value: string }[] =
  Object.entries(Governorate).map(([value, label]) => ({
    label,
    value,
  }));
