import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  private manufacturers = [
    'Asus',
    'Samsung',
    'LG',
    'Bosch',
    'Makita',
    'Huawei',
    'Lenovo',
  ];
  // An example object of models by manufacturer
  private modelsByManufacturer = {
    Asus: [
      { name: 'Zenbook UX425', year: 2020 },
      { name: 'ROG Zephyrus S17', year: 2021 },
    ],
    Samsung: [
      { name: 'Galaxy S21', year: 2021 },
      { name: 'Galaxy Watch3', year: 2020 },
    ],
    LG: [
      { name: 'Gram 17', year: 2021 },
      { name: 'UltraFine 4K Display', year: 2019 },
    ],
  };

  // An example object of technical specs by model code and manufacturer
  private specsByModelCodeAndManufacturer = {
    'Asus-Zenbook-UX425': {
      screen: '14.0 inches',
      cpu: 'Intel Core i7-1165G7',
      ram: '16GB',
    },
    'Asus-ROG-Zephyrus-S17': {
      screen: '17.3 inches',
      cpu: 'Intel Core i9-11900H',
      ram: '32GB',
    },
    'Samsung-Galaxy-S21': {
      screen: '6.2 inches',
      cpu: 'Exynos 2100',
      ram: '8GB',
    },
    'Samsung-Galaxy-Watch3': {
      screen: '1.4 inches',
      cpu: 'Exynos 9110',
      ram: '1GB',
    },
    'LG-Gram-17': {
      screen: '17.0 inches',
      cpu: 'Intel Core i7-1165G7',
      ram: '16GB',
    },
    'LG-UltraFine-4K-Display': {
      screen: '23.7 inches',
      cpu: 'N/A',
      ram: 'N/A',
    },
  };

  async getAllManufacturers() {
    await this.delay(Math.floor(Math.random() * 3000));
    return this.manufacturers;
  }

  async getModelsForManufacturer(manufacturerName: string) {
    await this.delay(Math.floor(Math.random() * 3000));
    return this.modelsByManufacturer[manufacturerName];
  }

  async getSpecsForModel(manufacturerName: string, modelCode: string) {
    await this.delay(Math.floor(Math.random() * 3000));
    return this.specsByModelCodeAndManufacturer[
      `${manufacturerName}-${modelCode.replace(/ /g, '-')}`
    ];
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
