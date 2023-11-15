# Manual Config

{% hint style="danger" %}
You do not need to do this if you have used the [Avalanche CLI](broken-reference)
{% endhint %}

### Build `AvalancheGo` Binary[​](https://docs.avax.network/subnets/setup-dfk-node#build-avalanchego-binary) <a href="#build-avalanchego-binary" id="build-avalanchego-binary"></a>

First, you need to download and build AvalancheGo (handles the orchestration of running Custom VMs). You can follow [this comprehensive guide](https://docs.avax.network/nodes/build/run-avalanche-node-manually) to complete this step. For this tutorial, we recommend compiling from source instead of using the `AvalancheGo Installer`.

### Build `subnet-evm` Binary[​](https://docs.avax.network/subnets/setup-dfk-node#build-subnet-evm-binary) <a href="#build-subnet-evm-binary" id="build-subnet-evm-binary"></a>

_For the steps below, we will assume that you completed first step successfully and are now in your AvalancheGo directory (within your `$GOPATH`)._

Next, you will clone the Subnet-EVM repository:

```
mkdir -p $GOPATH/src/github.com/ava-labs
cd $GOPATH/src/github.com/ava-labs
git clone git@github.com:ava-labs/subnet-evm.git
cd subnet-evm
```

{% hint style="info" %}
The repository cloning method used is SSH, which requires additional steps. You can find more about SSH and how to use it here. Without a public SSH key, the cloning process will not go through. As an alternative, you can use the HTTPS method:

`git clone https://github.com/ava-labs/subnet-evm.git`
{% endhint %}

Now that you are in the `ava-labs/subnet-evm` repository, you will build the binary and place it directly into the `plugins` directory. To do this, you will pass in the desired path to place the plugin binary. You will want to place this binary into the plugins directory of AvalancheGo.

```bash
./scripts/build.sh ~/.avalanchego/plugins/cN6t22ptqzNhvvB66z25f2eZXK92PR62fxoVYRzDw1hWsMZt2
```

The long string `cN6t22ptqzNhvvB66z25f2eZXK92PR62fxoVYRzDw1hWsMZt2` is the CB58 encoded VMID of PLAYA3ULL Subnet-EVM. AvalancheGo will use the name of this file to determine what VMs are available to run from the `plugins` directory.

### Tracking PLAYA3ULL Subnet and Restarting the Node[​](https://docs.avax.network/subnets/setup-dfk-node#tracking-dfk-subnet-and-restarting-the-node) <a href="#tracking-dfk-subnet-and-restarting-the-node" id="tracking-dfk-subnet-and-restarting-the-node"></a>

AvalancheGo will only validate the primary network by default. In order to add the PLAYA3ULL Subnet, you will need to add the PLAYA3ULL Subnet ID to the set of tracked Subnets in the node's config file or pass it through the command-line options of the node. Once the node's config file has been updated, you will need to start the Avalanche node (restart if already running).

Once you start the node, it will begin syncing the Primary Network. Once the node reaches the point in the Platform Chain where the PLAYA3ULL Subnet is created, it will begin syncing the PLAYA3ULL Subnet as well, and will start validating once it has fully bootstrapped.

#### Updating Config File[​](https://docs.avax.network/subnets/setup-dfk-node#updating-config-file) <a href="#updating-config-file" id="updating-config-file"></a>

You can skip this section if you want to track Subnets through command-line flags.

You need to create a new config file or edit your existing one for your node. In this tutorial, you will create a config file at: `~/.avalanchego/config.json`. Note: you can create a config file anywhere on your file system, you will just need to specify its location via the flag `--config-file=<file path>` when you start your node. See [this](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#config-file) for more info on configuration file and flags.

You will need to add the PLAYA3ULL Subnet ID to the track Subnets section of the config file:

```
{
    <OTHER-CONFIGURATIONS>
    "track-subnets": "2wLe8Ma7YcUmxMJ57JVWETMSHz1mjXmJc5gmssvKm3Pw8GkcFq"
}
```

Track Subnets is a comma separated list of Subnet IDs, so if you are validating more than one Subnet, you can simply add a comma to the end of the list and append the PLAYA3ULL Subnet ID `2wLe8Ma7YcUmxMJ57JVWETMSHz1mjXmJc5gmssvKm3Pw8GkcFq`.

#### Running the Node[​](https://docs.avax.network/subnets/setup-dfk-node#running-the-node) <a href="#running-the-node" id="running-the-node"></a>

First, make sure to shut down your node in case it is still running. Then, you will navigate back into the AvalancheGo directory:

```
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

If you went through the steps to set up a config file, then you can launch your node by specifying the config file on the command line:

```
./build/avalanchego --config-file ~/.avalanchego/config.json
```

If you want to track the Subnets through the command-line flag. You can append the other flags or even the `--config-file` flag as well, according to your need.

```
./build/avalanchego --track-subnets 2wLe8Ma7YcUmxMJ57JVWETMSHz1mjXmJc5gmssvKm3Pw8GkcFq
```

### Just Want the Commands? We Got You[​](https://docs.avax.network/subnets/setup-dfk-node#just-want-the-commands-we-got-you) <a href="#just-want-the-commands-we-got-you" id="just-want-the-commands-we-got-you"></a>

{% hint style="warning" %}
Run `go version`. **It should be 1.19.6 or above.** Run `echo $GOPATH`. **It should not be empty.**
{% endhint %}

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
cd $GOPATH/src/github.com/ava-labs
git clone git@github.com:ava-labs/avalanchego.git
cd avalanchego
./scripts/build.sh
cd $GOPATH/src/github.com/ava-labs
git clone git@github.com:ava-labs/subnet-evm.git
cd subnet-evm
./scripts/build.sh ~/.avalanchego/plugins/cN6t22ptqzNhvvB66z25f2eZXK92PR62fxoVYRzDw1hWsMZt2
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego --track-subnets 2wLe8Ma7YcUmxMJ57JVWETMSHz1mjXmJc5gmssvKm3Pw8GkcFq
```

{% hint style="info" %}
The repository cloning method used is SSH, which requires additional steps. You can find more about SSH and how to use it [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh). Without a public SSH key, the cloning process will not go through. As an alternative, you can use the HTTPS method:

`git clone https://github.com/ava-labs/avalanchego.git`

`git clone https://github.com/ava-labs/subnet-evm.git`
{% endhint %}

{% hint style="success" %}
The URL for our chain will \
**https://\[your-rpc-node]/ext/bc/k2SFEZ2MZr9UGXiycnA1DdaLqZTKDaHK7WUXVLhJk5F9DD8r1/rpc**
{% endhint %}

{% hint style="info" %}
Credit to Ava Labs for the original DFK write up

[https://docs.avax.network/subnets/setup-dfk-node](https://docs.avax.network/subnets/setup-dfk-node)
{% endhint %}
