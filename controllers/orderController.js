const Order = require('../models/Order');

// Transformação de dados (Mapping do JSON de entrada para o formato do Banco)
const mapOrderData = (data) => {
  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: new Date(data.dataCriacao),
    items: data.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};

// POST: Criar Pedido
exports.createOrder = async (req, res) => {
  try {
    const mappedData = mapOrderData(req.body);
    const newOrder = new Order(mappedData);
    await newOrder.save();
    res.status(201).json({ message: "Pedido criado!", data: newOrder });
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar pedido", details: error.message });
  }
};

// GET: Obter Pedido por ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar", details: error.message });
  }
};

// GET: Listar todos
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar", details: error.message });
  }
};

// PUT: Atualizar Pedido
exports.updateOrder = async (req, res) => {
  try {
    const mappedData = mapOrderData(req.body); 
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id }, 
      mappedData, 
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: "Não encontrado para atualizar" });
    res.status(200).json({ message: "Atualizado!", data: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar", details: error.message });
  }
};

// DELETE: Deletar Pedido
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.id });
    if (!deletedOrder) return res.status(404).json({ error: "Não encontrado para deletar" });
    res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar", details: error.message });
  }
};
