# Avalanche CLI

## Avalanche CLI

### Download Subnet Configuration

```bash
wget https://gist.githubusercontent.com/samthompsonkennedy/245469fb406479742d593a78fd26b0ba/raw/d03a1b2bde531ca4bf0685cca1907b0f355fdbbd/PLAYA3ULL-MAINNET.dat
```

### **Import subnet config into Avalanche CLI**

```bash
avalanche subnet import PLAYA3ULL-MAINNET.dat
```

### **Join Subnet**

{% hint style="info" %}
Follow the prompts from this documentation

[https://docs.avax.network/subnets/create-a-mainnet-subnet#join-a-subnet](https://docs.avax.network/subnets/create-a-mainnet-subnet#join-a-subnet)
{% endhint %}

```bash
avalanche subnet join PLAYA3ULL
```
