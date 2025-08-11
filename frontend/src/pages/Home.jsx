<CardContent className="space-y-6">
  {/* Formulário */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <Label htmlFor="faturamento">Faturamento Mensal (R$) *</Label>
      <Input
        id="faturamento"
        type="number"
        placeholder="Ex: 50000"
        value={roiData.faturamento}
        onChange={(e) => setRoiData({ ...roiData, faturamento: e.target.value })}
      />
    </div>

    <div>
      <Label htmlFor="margem">Margem de Lucro (%) *</Label>
      <Input
        id="margem"
        type="number"
        placeholder="Ex: 20"
        value={roiData.margem}
        onChange={(e) => setRoiData({ ...roiData, margem: e.target.value })}
      />
    </div>

    <div>
      <Label htmlFor="investimento">Investimento em Marketing (R$) *</Label>
      <Input
        id="investimento"
        type="number"
        placeholder="Ex: 5000"
        value={roiData.investimento}
        onChange={(e) => setRoiData({ ...roiData, investimento: e.target.value })}
      />
    </div>

    <div>
      <Label htmlFor="plano">Plano Escolhido *</Label>
      <Select value={roiData.plano} onValueChange={(value) => setRoiData({ ...roiData, plano: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um plano" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="essencial">Essencial - R$399/mês</SelectItem>
          <SelectItem value="estrategico">Estratégico - R$699/mês</SelectItem>
          <SelectItem value="premium">Premium - R$1.199/mês</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="md:col-span-2">
      <Label htmlFor="email">E-mail (opcional)</Label>
      <Input
        id="email"
        type="email"
        placeholder="seu@email.com"
        value={roiData.email}
        onChange={(e) => setRoiData({ ...roiData, email: e.target.value })}
      />
    </div>
  </div>

  <Button onClick={calculateROI} disabled={isCalculating} className="w-full" size="lg">
    {isCalculating ? 'Calculando...' : 'Calcular ROI'}
  </Button>

  {roiResult && (
    <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        Resultado da Análise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-green-600">ROI Estimado</p>
          <p className="text-2xl font-bold text-green-800">
            {roiResult.roi_estimado}%
          </p>
        </div>
        <div>
          <p className="text-sm text-green-600">Aumento de Faturamento</p>
          <p className="text-2xl font-bold text-green-800">
            R$ {roiResult.aumento_faturamento_estimado?.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Button asChild>
          <Link to="/contato">
            Quero Começar Agora
          </Link>
        </Button>
      </div>
    </div>
  )}
</CardContent>
