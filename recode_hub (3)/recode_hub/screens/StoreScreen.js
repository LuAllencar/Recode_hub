// screens/StoreScreen.js
// Tela de Loja e Inventário

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { bg, accent, text, border } from '../theme/colors';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import ProgressBar from '../components/ProgressBar';
import { 
  resources, 
  storeItems, 
  craftingRecipes, 
  transactionHistory 
} from '../data/Store';
import { AuthContext } from '../context/AuthContext';

export default function StoreScreen() {
  const { user } = useContext(AuthContext);
  
  // Simular dados do jogador (depois virá do Firebase)
  const [playerData, setPlayerData] = useState({
    coins: 2500,
    resources: {
      metal: 156,
      chip: 45,
      bateria: 78,
      madeira: 203,
      agua: 89,
      cristal: 12,
      codigo: 5,
    },
  });

  const [selectedTab, setSelectedTab] = useState('inventory'); // inventory, store, craft, history
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCrafting, setIsCrafting] = useState(false);

  // Função para comprar item
  const handlePurchase = (item) => {
    if (playerData.coins < item.price) {
      Alert.alert('Moedas Insuficientes', 'Você não tem moedas suficientes!');
      return;
    }

    Alert.alert(
      'Confirmar Compra',
      `Deseja comprar ${item.name} por ${item.price} moedas?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comprar',
          onPress: () => {
            // Deduz moedas
            const newCoins = playerData.coins - item.price;
            
            // Adiciona recursos
            const newResources = { ...playerData.resources };
            Object.entries(item.contents).forEach(([resource, amount]) => {
              newResources[resource] = (newResources[resource] || 0) + amount;
            });

            setPlayerData({
              coins: newCoins,
              resources: newResources,
            });

            Alert.alert('Compra Realizada!', `${item.name} adicionado ao inventário!`);
            setSelectedItem(null);
          },
        },
      ]
    );
  };

  // Função para craftar device
  const handleCraft = (recipe) => {
    // Verificar se tem recursos
    const hasEnough = Object.entries(recipe.requirements).every(
      ([resource, amount]) => playerData.resources[resource] >= amount
    );

    if (!hasEnough) {
      Alert.alert('Recursos Insuficientes', 'Você não tem recursos suficientes!');
      return;
    }

    Alert.alert(
      'Confirmar Crafting',
      `Construir ${recipe.deviceName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Construir',
          onPress: () => {
            // Deduz recursos
            const newResources = { ...playerData.resources };
            Object.entries(recipe.requirements).forEach(([resource, amount]) => {
              newResources[resource] -= amount;
            });

            setPlayerData(prev => ({
              ...prev,
              resources: newResources,
            }));

            // Simular crafting
            setIsCrafting(true);
            setTimeout(() => {
              setIsCrafting(false);
              Alert.alert(
                'Crafting Completo!',
                `${recipe.deviceName} foi construído com sucesso!\n+${recipe.xpReward} XP`
              );
            }, 2000); // 2 segundos (em produção seria recipe.craftTime)
          },
        },
      ]
    );
  };

  // Renderizar Inventário
  const renderInventory = () => (
    <View>
      {/* Moedas */}
      <GlassCard style={styles.coinsCard}>
        <View style={styles.coinsHeader}>
          <Text style={styles.coinsIcon}>🪙</Text>
          <View>
            <Text style={styles.coinsLabel}>Suas Moedas</Text>
            <Text style={styles.coinsAmount}>{playerData.coins.toLocaleString()}</Text>
          </View>
        </View>
      </GlassCard>

      {/* Recursos */}
      <Text style={styles.sectionTitle}>📦 Recursos</Text>
      <View style={styles.resourcesGrid}>
        {resources.map(resource => {
          const amount = playerData.resources[resource.id] || 0;
          return (
            <GlassCard key={resource.id} style={styles.resourceCard}>
              <Text style={styles.resourceIcon}>{resource.icon}</Text>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <Text style={[styles.resourceAmount, { color: resource.color }]}>
                {amount}x
              </Text>
              <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(resource.rarity) }]}>
                <Text style={styles.rarityText}>{resource.rarity}</Text>
              </View>
            </GlassCard>
          );
        })}
      </View>
    </View>
  );

  // Renderizar Loja
  const renderStore = () => (
    <View>
      <Text style={styles.sectionTitle}>⭐ Em Destaque</Text>
      {storeItems.filter(item => item.featured).map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setSelectedItem(item)}
        >
          <GlassCard style={styles.storeItemCard}>
            <View style={styles.storeItemHeader}>
              <Text style={styles.storeItemIcon}>{item.icon}</Text>
              <View style={styles.storeItemInfo}>
                <Text style={styles.storeItemName}>{item.name}</Text>
                <Text style={styles.storeItemDescription}>{item.description}</Text>
              </View>
              {item.discount > 0 && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{item.discount}%</Text>
                </View>
              )}
            </View>

            <View style={styles.storeItemContents}>
              <Text style={styles.contentsLabel}>Contém:</Text>
              {Object.entries(item.contents).map(([resource, amount]) => {
                const resourceData = resources.find(r => r.id === resource);
                return (
                  <View key={resource} style={styles.contentItem}>
                    <Text style={styles.contentIcon}>{resourceData?.icon}</Text>
                    <Text style={styles.contentText}>
                      {resourceData?.name} x{amount}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Preço:</Text>
              <Text style={styles.priceAmount}>🪙 {item.price}</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>🛍️ Itens Individuais</Text>
      <View style={styles.individualItemsGrid}>
        {storeItems.filter(item => !item.featured).map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedItem(item)}
            style={styles.individualItemWrapper}
          >
            <GlassCard style={styles.individualItem}>
              <Text style={styles.individualItemIcon}>{item.icon}</Text>
              <Text style={styles.individualItemName}>{item.name}</Text>
              <Text style={styles.individualItemPrice}>🪙 {item.price}</Text>
            </GlassCard>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Renderizar Crafting
  const renderCrafting = () => (
    <View>
      <Text style={styles.sectionTitle}>🔨 Construir Dispositivos</Text>
      
      {isCrafting && (
        <GlassCard style={styles.craftingProgress}>
          <Text style={styles.craftingText}>⚙️ Construindo...</Text>
          <ProgressBar current={50} max={100} color="blue" showLabel={false} />
        </GlassCard>
      )}

      {craftingRecipes.map(recipe => {
        const canCraft = Object.entries(recipe.requirements).every(
          ([resource, amount]) => playerData.resources[resource] >= amount
        );

        return (
          <GlassCard key={recipe.id} style={styles.recipeCard}>
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeIcon}>{recipe.icon}</Text>
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.deviceName}</Text>
                <Text style={styles.recipeXP}>+{recipe.xpReward} XP</Text>
              </View>
            </View>

            <View style={styles.requirements}>
              <Text style={styles.requirementsLabel}>Requer:</Text>
              {Object.entries(recipe.requirements).map(([resource, amount]) => {
                const resourceData = resources.find(r => r.id === resource);
                const hasEnough = playerData.resources[resource] >= amount;
                
                return (
                  <View key={resource} style={styles.requirementItem}>
                    <Text style={styles.requirementIcon}>{resourceData?.icon}</Text>
                    <Text style={[
                      styles.requirementText,
                      !hasEnough && styles.requirementInsufficient
                    ]}>
                      {resourceData?.name}: {playerData.resources[resource] || 0} / {amount}
                    </Text>
                  </View>
                );
              })}
            </View>

            <NeonButton
              title={canCraft ? 'Construir' : 'Recursos Insuficientes'}
              variant={canCraft ? 'green' : 'pink'}
              onPress={() => canCraft && handleCraft(recipe)}
              style={{ marginTop: 12, opacity: canCraft ? 1 : 0.5 }}
            />
          </GlassCard>
        );
      })}
    </View>
  );

  // Renderizar Histórico
  const renderHistory = () => (
    <View>
      <Text style={styles.sectionTitle}>📜 Histórico de Transações</Text>
      
      {transactionHistory.map(transaction => (
        <GlassCard key={transaction.id} style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionIcon}>{transaction.icon}</Text>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionItem}>{transaction.item}</Text>
              <Text style={styles.transactionTime}>
                {new Date(transaction.timestamp).toLocaleString('pt-BR')}
              </Text>
            </View>
            {transaction.amount && (
              <Text style={[
                styles.transactionAmount,
                { color: transaction.amount > 0 ? accent.green : accent.pink }
              ]}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount} 🪙
              </Text>
            )}
          </View>
        </GlassCard>
      ))}
    </View>
  );

  // Função auxiliar para cor de raridade
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'rgba(128, 128, 128, 0.3)';
      case 'uncommon': return 'rgba(0, 255, 136, 0.3)';
      case 'rare': return 'rgba(0, 204, 255, 0.3)';
      case 'epic': return 'rgba(123, 44, 191, 0.3)';
      case 'legendary': return 'rgba(255, 0, 110, 0.3)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LOJA & INVENTÁRIO</Text>
        <View style={styles.coinsDisplay}>
          <Text style={styles.coinsDisplayText}>🪙 {playerData.coins}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'inventory' && styles.tabActive]}
          onPress={() => setSelectedTab('inventory')}
        >
          <Text style={[styles.tabText, selectedTab === 'inventory' && styles.tabTextActive]}>
            📦 Inventário
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'store' && styles.tabActive]}
          onPress={() => setSelectedTab('store')}
        >
          <Text style={[styles.tabText, selectedTab === 'store' && styles.tabTextActive]}>
            🛍️ Loja
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'craft' && styles.tabActive]}
          onPress={() => setSelectedTab('craft')}
        >
          <Text style={[styles.tabText, selectedTab === 'craft' && styles.tabTextActive]}>
            🔨 Crafting
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'history' && styles.tabActive]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={[styles.tabText, selectedTab === 'history' && styles.tabTextActive]}>
            📜 Histórico
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        {selectedTab === 'inventory' && renderInventory()}
        {selectedTab === 'store' && renderStore()}
        {selectedTab === 'craft' && renderCrafting()}
        {selectedTab === 'history' && renderHistory()}
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal de Compra */}
      {selectedItem && (
        <Modal
          visible={!!selectedItem}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedItem(null)}
        >
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalContent}>
              <Text style={styles.modalIcon}>{selectedItem.icon}</Text>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalDescription}>{selectedItem.description}</Text>

              <View style={styles.modalContents}>
                <Text style={styles.modalContentsLabel}>Você receberá:</Text>
                {Object.entries(selectedItem.contents).map(([resource, amount]) => {
                  const resourceData = resources.find(r => r.id === resource);
                  return (
                    <View key={resource} style={styles.modalContentItem}>
                      <Text style={styles.modalContentIcon}>{resourceData?.icon}</Text>
                      <Text style={styles.modalContentText}>
                        {resourceData?.name} x{amount}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.modalPrice}>
                <Text style={styles.modalPriceLabel}>Preço Total:</Text>
                <Text style={styles.modalPriceAmount}>🪙 {selectedItem.price}</Text>
              </View>

              <NeonButton
                title="Comprar Agora"
                variant="green"
                onPress={() => handlePurchase(selectedItem)}
                style={{ marginBottom: 12 }}
              />

              <NeonButton
                title="Cancelar"
                variant="pink"
                onPress={() => setSelectedItem(null)}
              />
            </GlassCard>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg.primary,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: accent.green,
  },
  coinsDisplay: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: accent.green,
  },
  coinsDisplayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: accent.green,
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: bg.secondary,
    borderBottomWidth: 1,
    borderBottomColor: border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  tabActive: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
  },
  tabText: {
    fontSize: 11,
    color: text.secondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: accent.green,
    fontWeight: 'bold',
  },

  // Content
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.primary,
    marginTop: 16,
    marginBottom: 12,
  },

  // Coins Card
  coinsCard: {
    marginBottom: 16,
  },
  coinsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinsIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  coinsLabel: {
    fontSize: 14,
    color: text.secondary,
  },
  coinsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: accent.green,
  },

  // Resources Grid
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resourceCard: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    padding: 12,
  },
  resourceIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 14,
    color: text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  resourceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    color: text.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Store Items
  storeItemCard: {
    marginBottom: 16,
  },
  storeItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeItemIcon: {
    fontSize: 48,
    marginRight: 12,
  },
  storeItemInfo: {
    flex: 1,
  },
  storeItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.primary,
  },
  storeItemDescription: {
    fontSize: 12,
    color: text.secondary,
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: accent.pink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: text.primary,
  },
  storeItemContents: {
    marginBottom: 12,
  },
  contentsLabel: {
    fontSize: 14,
    color: text.secondary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contentIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  contentText: {
    fontSize: 14,
    color: text.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: border.light,
  },
  priceLabel: {
    fontSize: 14,
    color: text.secondary,
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: accent.green,
  },

  // Individual Items
  individualItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  individualItemWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  individualItem: {
    alignItems: 'center',
    padding: 12,
  },
  individualItemIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  individualItemName: {
    fontSize: 12,
    color: text.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  individualItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: accent.green,
  },

  // Crafting
  craftingProgress: {
    marginBottom: 16,
    alignItems: 'center',
},
craftingText: {
fontSize: 16,
color: accent.blue,
marginBottom: 12,
fontWeight: 'bold',
},
recipeCard: {
marginBottom: 16,
},
recipeHeader: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 12,
},
recipeIcon: {
fontSize: 48,
marginRight: 12,
},
recipeInfo: {
flex: 1,
},
recipeName: {
fontSize: 18,
fontWeight: 'bold',
color: text.primary,
},
recipeXP: {
fontSize: 12,
color: accent.purple,
marginTop: 2,
},
requirements: {
marginBottom: 12,
},
requirementsLabel: {
fontSize: 14,
color: text.secondary,
marginBottom: 8,
fontWeight: 'bold',
},
requirementItem: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 6,
},
requirementIcon: {
fontSize: 20,
marginRight: 8,
},
requirementText: {
fontSize: 14,
color: text.primary,
},
requirementInsufficient: {
color: accent.pink,
},
// Transaction History
transactionCard: {
marginBottom: 12,
},
transactionHeader: {
flexDirection: 'row',
alignItems: 'center',
},
transactionIcon: {
fontSize: 32,
marginRight: 12,
},
transactionInfo: {
flex: 1,
},
transactionItem: {
fontSize: 14,
fontWeight: 'bold',
color: text.primary,
},
transactionTime: {
fontSize: 11,
color: text.tertiary,
marginTop: 2,
},
transactionAmount: {
fontSize: 16,
fontWeight: 'bold',
},
// Modal
modalOverlay: {
flex: 1,
backgroundColor: 'rgba(0, 0, 0, 0.9)',
justifyContent: 'center',
padding: 20,
},
modalContent: {
alignItems: 'center',
},
modalIcon: {
fontSize: 64,
marginBottom: 16,
},
modalTitle: {
fontSize: 24,
fontWeight: 'bold',
color: accent.green,
marginBottom: 8,
},
modalDescription: {
fontSize: 14,
color: text.secondary,
textAlign: 'center',
marginBottom: 20,
},
modalContents: {
width: '100%',
marginBottom: 20,
},
modalContentsLabel: {
fontSize: 14,
color: text.secondary,
marginBottom: 12,
fontWeight: 'bold',
},
modalContentItem: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 8,
},
modalContentIcon: {
fontSize: 24,
marginRight: 12,
},
modalContentText: {
fontSize: 16,
color: text.primary,
},
modalPrice: {
width: '100%',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 20,
paddingTop: 16,
borderTopWidth: 1,
borderTopColor: border.light,
},
modalPriceLabel: {
fontSize: 16,
color: text.secondary,
fontWeight: 'bold',
},
modalPriceAmount: {
fontSize: 24,
fontWeight: 'bold',
color: accent.green,
},
});